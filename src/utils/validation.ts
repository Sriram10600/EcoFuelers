import { ValidationResult, EmissionDataValidation, GamePreventionRules, CreditTransaction } from '../types';

const EMISSION_VALIDATION_RULES: EmissionDataValidation = {
  minConsumption: 0,
  maxConsumption: 1000, // kWh
  minEmissions: 0,
  maxEmissions: 500 // kg CO2
};

const GAME_PREVENTION_RULES: GamePreventionRules = {
  minTimeBetweenActions: 5 * 60 * 1000, // 5 minutes
  maxActionsPerHour: 10,
  cooldownPeriod: 30 * 60 * 1000, // 30 minutes
  suspiciousPatternThreshold: 0.8
};

export const validateEmissionData = (consumption: number, emissions: number): ValidationResult => {
  const errors: string[] = [];
  
  if (consumption < EMISSION_VALIDATION_RULES.minConsumption || consumption > EMISSION_VALIDATION_RULES.maxConsumption) {
    errors.push(`Energy consumption must be between ${EMISSION_VALIDATION_RULES.minConsumption} and ${EMISSION_VALIDATION_RULES.maxConsumption} kWh`);
  }
  
  if (emissions < EMISSION_VALIDATION_RULES.minEmissions || emissions > EMISSION_VALIDATION_RULES.maxEmissions) {
    errors.push(`CO2 emissions must be between ${EMISSION_VALIDATION_RULES.minEmissions} and ${EMISSION_VALIDATION_RULES.maxEmissions} kg`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const detectSuspiciousActivity = (
  userActions: { timestamp: number; type: string }[],
  rules: GamePreventionRules = GAME_PREVENTION_RULES
): boolean => {
  if (userActions.length === 0) return false;

  // Check frequency of actions
  const now = Date.now();
  const recentActions = userActions.filter(action => 
    now - action.timestamp < 60 * 60 * 1000 // Last hour
  );

  if (recentActions.length > rules.maxActionsPerHour) {
    return true;
  }

  // Check time between actions
  for (let i = 1; i < recentActions.length; i++) {
    const timeDiff = recentActions[i].timestamp - recentActions[i-1].timestamp;
    if (timeDiff < rules.minTimeBetweenActions) {
      return true;
    }
  }

  // Detect pattern of rapid switches (e.g., dark mode on/off)
  const patternDetection = recentActions.reduce((acc, action, index) => {
    if (index === 0) return acc;
    if (action.type === recentActions[index-1].type) {
      acc.patternCount++;
    }
    return acc;
  }, { patternCount: 0 });

  const patternRatio = patternDetection.patternCount / recentActions.length;
  return patternRatio > rules.suspiciousPatternThreshold;
};

export const processCreditsTransaction = async (
  transaction: CreditTransaction,
  maxRetries: number = 3
): Promise<CreditTransaction> => {
  let currentTransaction = { ...transaction };

  try {
    // Validate transaction
    if (transaction.amount <= 0) {
      throw new Error('Invalid credit amount');
    }

    // Process transaction based on type
    if (transaction.type === 'award') {
      // Implement credit award logic
      currentTransaction.status = 'completed';
    } else if (transaction.type === 'conversion') {
      // Implement AWE points conversion logic
      currentTransaction.status = 'completed';
    }

    return currentTransaction;
  } catch (error) {
    currentTransaction.status = 'failed';
    currentTransaction.reason = error.message;

    // Implement retry logic
    if (currentTransaction.retryCount < maxRetries) {
      currentTransaction.retryCount++;
      return processCreditsTransaction(currentTransaction, maxRetries);
    }

    return currentTransaction;
  }
};

export const validateAndProcessUserAction = async (
  userId: string,
  actionType: string,
  creditAmount: number,
  userActions: { timestamp: number; type: string }[]
): Promise<{ success: boolean; message: string; transaction?: CreditTransaction }> => {
  // Check for suspicious activity
  if (detectSuspiciousActivity(userActions)) {
    return {
      success: false,
      message: 'Action blocked due to suspicious activity. Please wait before trying again.'
    };
  }

  // Create and process credit transaction
  const transaction: CreditTransaction = {
    id: `${Date.now()}-${userId}`,
    userId,
    amount: creditAmount,
    type: 'award',
    status: 'pending',
    timestamp: new Date().toISOString(),
    retryCount: 0
  };

  const processedTransaction = await processCreditsTransaction(transaction);

  if (processedTransaction.status === 'completed') {
    return {
      success: true,
      message: 'Credits awarded successfully',
      transaction: processedTransaction
    };
  }

  return {
    success: false,
    message: `Failed to award credits: ${processedTransaction.reason}`,
    transaction: processedTransaction
  };
}; 